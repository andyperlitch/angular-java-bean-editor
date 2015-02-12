/*
* Copyright (c) 2013 DataTorrent, Inc. ALL Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
'use strict';

angular.module('dt.javaBeanEditor', [])

/**
  * @ngdoc directive
  * @name javaBeanEditor
  * @restrict A
  * @description A directive for editing a java bean.
  * @element 
  * @example 
  <pre>
    
  </pre>
**/
.directive('javaBeanEditor', function() {

  return {
    scope: {
      typeSchema: '=',
      values: '=',
      helperService: '='
    },
    templateUrl: 'components/javaBeanEditor/javaBeanEditor.html',
    link: {
      pre: function(scope) {
        scope.values = scope.values[scope.typeSchema.name];
      }
    }
  };

})
.directive('jbeProperty', function() {

  var knownTypes = {
    'boolean': 'boolean',
    'int': 'int',
    'double': 'double',
    'long': 'int',
    'java.lang.String': 'string',
    'java.util.List': 'array'
  };

  return {
    scope: true,
    templateUrl: 'components/javaBeanEditor/jbeProperty.html',
    link: {
      pre: function(scope, elem, attrs) {

        // cache property in local var
        var property = scope.property;

        // nice display name
        scope.propertyDisplayName = _.startCase(property.name);

        // check if we should hide the label
        scope.hideLabel = scope.$eval(attrs.hideLabel);

        // must differentiate between array and object
        scope.valueType = scope.values[property.name] instanceof Array ? 'array' : typeof scope.values[property.name];

        // set correct input type for template retrieval
        var known = knownTypes[property.type];
        if (known) {
          scope.inputType = known;
        }
        // Check for array
        else if (property.type.indexOf('[L') === 0 && property.type.slice(-1) === ';') {
          scope.inputType = 'array';
        }
        // Otherwise it is complex
        else {
          scope.inputType = 'complex';  
        }

        // SPECIAL CASE: arrays
        if (scope.inputType === 'array') {
          
          // scope.typeArg:

          // Lists
          if (property.hasOwnProperty('typeArgs')) {
            scope.typeArg = property.typeArgs[0].type;
          }
          // Arrays
          else {
            scope.typeArg = property.type.slice(2,-1);
          }

          // scope.values:
          
          // Arrays<Simple>
          if (scope.valueType === 'array') {
            scope.values = scope.values[property.name];
          }
          // Lists & Arrays<Complex>
          else {
            var key = Object.keys(scope.values[property.name])[0];
            scope.values = scope.values[property.name][key];
          }
          
        }
      }
    }
  };

})
.directive('jbeComplexProperty', function() {

  var displayableTypes = ['number', 'string', 'boolean'];

  return {
    scope: false,
    templateUrl: 'components/javaBeanEditor/jbeComplexProperty.html',
    link: {
      pre: function(scope) {
        scope.propertyDisplayName = _.startCase(scope.property.name);
        scope.getDisplayValue = function(value) {
          if (displayableTypes.indexOf(typeof value) > -1) {
            return value;
          }
          else if (value instanceof Array){
            return value;
          }
          else if (value === null) {
            return 'null';
          }
          else {
            return '(complex object)';
          }
        };
        scope.edit = function() {
  
          var property = scope.property,
              propertyType = property.type,
              value = scope.values[property.name],
              valueType,
              fetchAssignableTypes = true;
  
          // Check for simple array
          if (value instanceof Array) {
            valueType = propertyType;
  
            // If it is an array, we do not need to get assignableTypes OR the type schema
            fetchAssignableTypes = true;
          }
  
          // getAssignableTypes
          var assignableTypes = scope.helperService.getAssignableTypes(propertyType);
          // getTypeSchema
          scope.helperService.getTypeSchema(valueType)
        };
      }
    }
  };

})
.directive('jbeArrayProperty', function() {
  return {
    scope: {
      arrayProperty: '=jbeArrayProperty',
      typeArg: '=',
      values: '=',
      index: '=',
      helperService: '='
    },
    templateUrl: 'components/javaBeanEditor/jbeArrayProperty.html',
    link: {
      pre: function(scope) {
        // The property definition for the array
        var arrProp = scope.arrayProperty;

        // We have to fake the values and property object 
        // in order to reuse the jbeProperty directive
        scope.property = {
          canGet: true,
          canSet: true,
          name: scope.index,
          type: scope.typeArg
        };
      }
    }
  };
});