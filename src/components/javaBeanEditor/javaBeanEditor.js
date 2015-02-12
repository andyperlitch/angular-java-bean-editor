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
    'java.lang.String': 'string'
  };

  return {
    scope: true,
    templateUrl: 'components/javaBeanEditor/jbeProperty.html',
    link: {
      pre: function(scope) {
        scope.getType = function(property) {
          return knownTypes[property.type] || 'complex';
        }
        scope.propertyDisplayName = _.startCase(scope.property.name);
      }
    }
  }

})
.directive('jbeComplexProperty', function() {

  var displayableTypes = ['number', 'string', 'boolean'];

  return {
    scope: false,
    templateUrl: 'components/javaBeanEditor/jbeComplexProperty.html',
    link: function(scope) {
      scope.propertyDisplayName = _.startCase(scope.property.name);
      scope.getDisplayValue = function(value) {
        if (displayableTypes.indexOf(typeof value) > -1) {
          return value;
        }
        else if (value instanceof Array){
          return value;
        }
        else {
          return '(complex object)';
        }
      };
      scope.edit = function() {
        // getAssignableTypes
        // getTypeSchema
        console.log('edit complex type');
      };
    }
  }

});