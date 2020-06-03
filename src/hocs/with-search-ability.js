import React from "react";
import Router from "next/router";

const withSearchAbility = (WrappedComponent, selectData) => {
  return class extends React.Component {
    state = {
      searchText: "",
    };

    handleSearch = () => {
      const { searchText } = this.state;

      if (typeof window !== "undefined") {
        window.document.body.style.overflowY = "auto";
      }

      Router.push(`/search?query=${searchText.toLowerCase()}`);
    };

    onClickSearch = () => {
      this.handleSearch();
    };

    onChangeText = ({ target }) => {
      this.setState({
        searchText: target.value,
      });
    };

    onKeyPress = (e) => {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    };

    render() {
      return (
        <WrappedComponent
          search={{
            onClickSearch: this.onClickSearch,
            onChangeText: this.onChangeText,
            onKeyPress: this.onKeyPress,
          }}
          {...this.props}
        />
      );
    }
  };
};

export default withSearchAbility;
