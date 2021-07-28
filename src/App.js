import React, {useState} from 'react';
import './App.css';
import Nav from './components/Nav'
import faker from 'faker';
import { random } from 'lodash';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import Switch from './components/Switch';
import Footer from './components/Footer';
require('codemirror/mode/javascript/javascript');


function App() {

  const [obj, setObj] = useState("");
  const [output, setOutput] = useState("");

  const generateFakeJson = () => {
    let defaultObj = {
      locale: 'en',
      type: null,
      prop: null
    };

    let mergeObj = Object.assign(defaultObj, obj);

    setOutput(JSON.stringify(_generate_response(mergeObj), null, 2))
  }

  const _generate_response = (obj) => {
    let result = null;

    if (obj.type === 'object') {
        
        if (! obj.prop) return false;

        result = {};

        for(let key in obj.prop) {
            result[key] = _generate_response(obj.prop[key]);
        }

        return result;
    }

    if (obj.type === 'array') {

        if (! obj.prop) return false;

        result = [];

        let max = obj.total || 1;

        for(let i = 1; i <= max; i++) {
            let nObjs = {};
            for(let key in obj.prop) {
              console.log(key)
                nObjs[key] = _generate_response(obj.prop[key]);
            }
            result.push(nObjs);
        }

        return result;
    }
    console.log(obj.type)
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
    theme: "material",
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
          <h2 className="text-center my-4 py-4 secondary-text">Write Fake, Get Fake<br/>
            <span className="font-weight-bold">Fake-the-<span className="primary-text">Json</span></span>
          </h2>
          <p></p>
          <div className="row">
            <div className="col-md-5 com-sm-12">
              <label>Input Schema</label>
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
              </div>
            <div className="col-md-2 com-sm-12">
              <Switch handleGenerateFakeJson={generateFakeJson}/>
            </div>
            <div className="col-md-5 com-sm-12">
              <label>Output JSON</label> 
              <CodeMirror
                  options={cmOptions}
                  value={output}
              />
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
