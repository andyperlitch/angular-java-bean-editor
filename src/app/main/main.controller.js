'use strict';

angular.module('angularJavaBeanEditor')
  .controller('MainCtrl', function ($scope, typeSchemaHelper) {
    
    $scope.typeSchemaHelper = typeSchemaHelper;
    $scope.exampleTypeSchema = typeSchemaHelper.getTypeSchema('com.datatorrent.stram.webapp.OperatorDiscoveryTest$TestOperator');
    $scope.exampleValueSchema = {"com.datatorrent.stram.webapp.OperatorDiscoveryTest$TestOperator": {
      "name": null,
      "intProp": 0,
      "longProp": 0,
      "doubleProp": 0,
      "booleanProp": true,
      "stringList": {"java.util.ArrayList": [
        "four",
        "five"
      ]},
      "props": {"java.util.Properties": {"key1": "value1"}},
      "nested": null,
      "map": {"java.util.HashMap": {"key1": {"com.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured": {
        "size": 0,
        "name": null,
        "list": null
      }}}},
      "stringArray": [
        "one",
        "two",
        "three"
      ],
      "color": "BLUE",
      "structuredArray": {"[Lcom.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured;": [{"com.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured": {
        "size": 0,
        "name": "s1",
        "list": null
      }}]}
    }};


  })
  .factory('typeSchemaHelper', function() {

    var schemas = {

      'com.datatorrent.stram.webapp.OperatorDiscoveryTest$TestOperator': {
        "name": "com.datatorrent.stram.webapp.OperatorDiscoveryTest$TestOperator",
        "properties": [
          {
            "name": "booleanProp",
            "canGet": true,
            "canSet": true,
            "type": "boolean"
          },
          {
            "name": "color",
            "canGet": true,
            "canSet": true,
            "type": "com.datatorrent.stram.webapp.OperatorDiscoveryTest$Color"
          },
          {
            "name": "doubleProp",
            "canGet": true,
            "canSet": true,
            "type": "double"
          },
          {
            "name": "intProp",
            "canGet": true,
            "canSet": true,
            "type": "int"
          },
          {
            "name": "longProp",
            "canGet": true,
            "canSet": true,
            "type": "long"
          },
          {
            "name": "map",
            "canGet": true,
            "canSet": true,
            "typeArgs": [
              {"type": "java.lang.String"},
              {"type": "com.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured"}
            ],
            "type": "java.util.Map"
          },
          {
            "name": "name",
            "canGet": true,
            "canSet": true,
            "type": "java.lang.String"
          },
          {
            "name": "nested",
            "canGet": true,
            "canSet": true,
            "type": "com.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured"
          },
          {
            "name": "props",
            "canGet": true,
            "canSet": true,
            "type": "java.util.Properties"
          },
          {
            "name": "stringArray",
            "canGet": true,
            "canSet": false,
            "type": "[Ljava.lang.String;"
          },
          {
            "name": "stringList",
            "canGet": true,
            "canSet": true,
            "typeArgs": [{"type": "java.lang.String"}],
            "type": "java.util.List"
          },
          {
            "name": "structuredArray",
            "canGet": true,
            "canSet": true,
            "type": "[Lcom.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured;"
          }
        ]
      },

      'com.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured': {
        "name": "com.datatorrent.stram.webapp.OperatorDiscoveryTest$Structured",
        "properties": [
          {
            "name": "list",
            "canGet": true,
            "canSet": true,
            "typeArgs": [{"type": "java.lang.String"}],
            "type": "java.util.ArrayList"
          },
          {
            "name": "name",
            "canGet": true,
            "canSet": true,
            "type": "java.lang.String"
          },
          {
            "name": "size",
            "canGet": true,
            "canSet": true,
            "type": "int"
          }
        ]
      },

      'com.datatorrent.stram.webapp.OperatorDiscoveryTest$Color': {
        "name": "com.datatorrent.stram.webapp.OperatorDiscoveryTest$Color",
        "enum": [
          "BLUE",
          "RED",
          "WHITE"
        ],
        "properties": [{
          "name": "declaringClass",
          "canGet": true,
          "canSet": false,
          "typeArgs": [{"type": "E"}],
          "type": "java.lang.Class"
        }]
      }

    };


    return {
      getAssignableTypes: function(propertyType) {

      },
      getTypeSchema: function(className) {
        return schemas[className];
      }
    }
  });
