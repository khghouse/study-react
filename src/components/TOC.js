import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log("==> TOC render shouldComponentUpdate", newProps.data, this.props.data);
        if(this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        console.log("==> TOC render");
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length) {
            lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id} data-id={data[i].id}
            onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}>{data[i].title}</a></li>);
            i = i + 1;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }

    /*
    render() {
      return (
        <nav>
          <ul>
              <li><a href="1.html">HTML</a></li>
              <li><a href="2.html">CSS</a></li>
              <li><a href="3.html">JavaScript</a></li>
          </ul>
        </nav>
      );
    }
    */
}

export default TOC;