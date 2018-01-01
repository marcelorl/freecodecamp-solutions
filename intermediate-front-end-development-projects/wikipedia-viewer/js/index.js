var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debounce = void 0;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      keyword: '',
      result: []
    };

    _this.onSearch = _this.onSearch.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "onSearch",
    value: function onSearch(el) {
      var _this2 = this;

      var keyword = el.target.value;

      if (!keyword) {
        this.setState({ result: [] });
        return;
      }

      clearTimeout(debounce);

      this.setState({ keyword: keyword });
      debounce = setTimeout(function () {

        $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=" + keyword + "&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?").then(function (res) {
          var result = res.query.pages;
          _this2.setState({
            result: Object.keys(result).map(function (id) {
              return result[id];
            })
          });
        });
      }, 1000);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
          "div",
          { className: "text-center jumbotron d-flex flex-column mt-3" },
          React.createElement(
            "h2",
            { className: "display-4" },
            "Wikipedia Viewer"
          ),
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement("input", { onChange: this.onSearch }),
            React.createElement(
              "a",
              { target: "_blank", className: "mt-2 mb-2", href: "https://en.wikipedia.org/wiki/Special:Random" },
              "Fellin Lucky"
            )
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            this.state.result.map(function (item, key) {
              return React.createElement(
                "li",
                { className: "text-left list-group-item list-group-item-action", key: item.index },
                React.createElement(
                  "a",
                  { className: "text-dark", href: "https://en.wikipedia.org/?curid=" + item.index, target: "_blank" },
                  React.createElement(
                    "div",
                    { className: "font-weight-bold" },
                    item.title
                  ),
                  React.createElement(
                    "div",
                    { className: "font-weight-light" },
                    item.extract
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));