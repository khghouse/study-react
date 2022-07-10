import './App.css';
import { Component } from 'react';
import TOC from './components/TOC.js'
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id : 2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{titls:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent() {
    var i = 0;
    while(i < this.state.contents.length) {
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1
    }
  }

  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id:this.max_content_id
        });
        console.log(_title, _desc);

        /*
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents : newContents
        });
        */
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      var _content = this.getReadContent();

      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id : _id, title : _title, desc : _desc}
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents: _contents,
          mode: 'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    console.log("render", this);
    return _article;
  }

  render() {
    console.log('App render');

    // return()에 하나의 태그만 포함되도록 해야 한다.
    return (
    <div className="App">
      <Subject title={this.state.subject.title} sub={this.state.subject.sub} onChangePage={function() {
        this.setState({ mode : "welcome" });
        }.bind(this)}>  
      </Subject>

      <TOC onChangePage={function(id){
        this.setState({
          mode: "read",
          selected_content_id:Number(id)
        });
      }.bind(this)} data={this.state.contents}></TOC>

      <Control onChangeMode={function(_mode) {
        if(_mode === 'delete') {
          if(window.confirm('really?')) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while(i < _contents.length) {
              if(_contents[i].id === this.state.selected_content_id) {
                _contents.splice(i, 1);
                break;
              }
              i = i + 1;
            }
            this.setState({
              mode: 'welcome',
              contents: _contents
            });
            alert('deleted!');
          }
        } else {
          this.setState({
            mode: _mode
          });
        }
      }.bind(this)}></Control>
      {this.getContent()}
    </div>
    );
  }
}

export default App;


















// 클래스 방식으로 구현
/*
class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    )
  }
}
*/

// 함수 방식으로 구현
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/