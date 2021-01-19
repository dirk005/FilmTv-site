import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FormInput from "./form-input";
import CustomButton from "./custom-button";
import ScrollContainer from "../container/scroll-container";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: "",
      searchData: null,
    };
  }

  handleChange = (event) => {
    const apiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
    const { value } = event.target;
    if (value) {
      this.setState({ searchField: value }, () => {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${this.state.searchField.replace(
          " ",
          "%20"
        )}&include_adult=false`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            this.setState({ ...this.state, searchData: data });
          })
          .catch((err) => console.log(err.message));
      });
    } else {
      this.setState({ searchData: null, searchField: "" });
    }
  };

  render() {
    const { searchData } = this.state;
    const { history } = this.props;

    return (
      <div >
        <div className="discover-page__search">
          <FormInput
            name="search"
            type="text"
            label="Search"
            handleChange={this.handleChange}
            value={this.state.searchField}
            required
          />
        </div>

        <div className="discover-page__search-list">
          {searchData ? (
            <div>
              {searchData.results
                .filter((result) => result.poster_path)

                .map((result, key) => (
                  <div key={key} className="discover-page__search-list--item">
                    <span className="detailed-display__slide--text-header__rating">
                      {result.vote_average}
                    </span>
                    <img
                      className="discover-page__search-list--item_image"
                      src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                      alt={
                        result.hasOwnProperty("title")
                          ? result.title
                          : result.name
                      }
                    />
                    <div className="discover-page__search-list--item-description">
                      <span className="discover-page__search-list--item-description_name">
                        {result.hasOwnProperty("title")
                          ? result.title
                          : result.name}
                      </span>
                      <span className="discover-page__search-list--item-description_overview">
                        {result.overview}
                      </span>

                      <div className="discover-page__search-list--item-description_buttons">
                        <CustomButton
                          onClick={() =>
                            history.push(
                              `/details-page/${result.media_type}/${result.id}`
                            )
                          }
                        >
                          View
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {" "}
              <ScrollContainer />{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
