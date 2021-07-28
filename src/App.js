import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import faker from 'faker';
import { random } from 'lodash';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/javascript/javascript');
import Input from './components/Input';
import Switch from './components/Switch';
import Output from './components/Output';

function App() {
  // const [obj, setObj] = useState({
  //   locale: 'en',
  //   type: 'object',
  //   prop: {
  //     id: {
  //       type: 'datatype.uuid'
  //     },
  //     name: {
  //       type: 'lorem.words',
  //       min: 10,
  //       max: 15
  //     },
  //     comments: {
  //       type: 'array',
  //       prop: {
  //         user: {
  //           type: 'object',
  //           prop: {
  //             id: {
  //                 type: 'datatype.uuid'
  //             },
  //             name: {
  //                 type: 'name.firstName'
  //             },
  //             roles: {
  //                 type: 'object',
  //                 prop: {
  //                     email: {
  //                         type: 'internet.email'
  //                     }
  //                 }
  //             }
  //           }
  //         }
  //       }
  //     } 
  //   }
  // });

  const [obj, setObj] = useState("");

  const generateFakeJson = () => {
    let defaultObj = {
      locale: 'en',
      type: null,
      prop: null
    };

    let mergeObj = Object.assign(defaultObj, obj);

    console.log(_generate_response(mergeObj))
  }

  const _generate_response = (obj) => {
    let result = null;

    if (obj.type == 'object') {
        
        if (! obj.prop) return false;

        result = {};

        for(var key in obj.prop) {
            result[key] = _generate_response(obj.prop[key]);
        }

        return result;
    }

    if (obj.type == 'array') {
        
        if (! obj.prop) return false;

        result = [];

        let max = obj.total || 1;

        for(let i = 0; i < max; i++) {
            let nObjs = {};
            for(var key in obj.prop) {
                nObjs[key] = _generate_response(obj.prop[key]);
            }
            result.push(nObjs);
        }

        return result;
    }

    let parseType = obj.type.split('.');
    let fkr = faker;

    parseType.forEach((item) => {
      fkr = fkr[item];
    })

    if (obj.hasOwnProperty('min') && obj.hasOwnProperty('max')) {
      return fkr(random(obj.min, obj.max));
    }

    if (obj.hasOwnProperty('min')) {
       return fkr(obj.min);
    }

    if (obj.hasOwnProperty('max')) {
      return fkr(random(0, obj.max));
    }

    return fkr();
  }

  const cmOptions = {
    theme: "default",
    height: "auto",
    viewportMargin: Infinity,
    mode: {
      name: "javascript",
      json: true,
      statementIndent: 2
    },
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2
  };
  
  return (
    <div className="App">
        <Nav/>
        <div className="container">
          <h2 className="text-center my-4 py-4 secondary-text">Welcome to <br/>
            <span className="font-weight-bold">Fake-the-<span className="primary-text">Json</span></span>
          </h2>
          <p></p>
          <div className="row">
            <div className="col-md-5 com-sm-12">
            <CodeMirror
          options={cmOptions}
          onChange={(editor, data, value) => {
             try {
                var jsonStr = value.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
                  return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
                });
                
                setObj(JSON.parse(jsonStr))
             } catch (error) {
                setObj({})
             }
          }}
        />
        <button onClick={() => generateFakeJson()}>Render</button>
              </div>
            <div className="col-md-2 com-sm-12">
              <Switch/>
            </div>
            <div className="col-md-5 com-sm-12">
              <Output/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
