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

      const { type } = Router.query;

      Router.push(
        type !== "store"
          ? `/search?query=${searchText.toLowerCase()}`
          : `/search?query=${searchText.toLowerCase()}&type=${type}`,
        type !== "store"
          ? `/search?query=${searchText.toLowerCase()}`
          : `/search?query=${searchText.toLowerCase()}&type=${type}`,
        {
          shallow: true,
        }
      );
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
