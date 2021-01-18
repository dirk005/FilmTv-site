import React from "react";

import { Accordion, Card } from "react-bootstrap";

import TvEpisodeDisplay from "./tv-episodes-display";

const TvSeasonDisplay = ({ seasons, id }) => (
  <div className="season_display">
    <Accordion defaultActiveKey="0">
      {seasons
        .filter((season) => season.season_number !== 0)
        .map((season, key) => (
          <div className="season_display-box" key={key}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={key + 1}>
                <div className="season_display-box_text">
                  <span className="season_display-box__name">
                    {season.name}
                  </span>

                  <span> Aired Date : {season.air_date}</span>
                  <span className="season_display-box__count">
                    {" "}
                    Episodes : {season.episode_count}
                  </span>
                </div>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey={key + 1}>
                <Card.Body>
                  <div className="season_display-heading">
                    <img
                      className="season_display-heading--image"
                      src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                      alt={season.name}
                    />

                    <span className="season_display-heading--overview">
                      {season.overview}
                    </span>
                  </div>
                  <TvEpisodeDisplay
                    seasonId={id}
                    season_number={season.season_number}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </div>
        ))}
    </Accordion>
  </div>
);

export default TvSeasonDisplay;
