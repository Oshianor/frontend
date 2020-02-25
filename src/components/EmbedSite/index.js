import React from 'react'
import EmbedSiteRoot from './components/EmbedSiteRoot'
import Typography from "@material-ui/core/Typography";
import Action from './components/Action';

export default function index(props) {
  const { topic } = props;  

	return (
    <div>
      <Typography align="left" variant="h3">
        {topic.title}
      </Typography>
      <EmbedSiteRoot topic={topic} />
    </div>
  );
}
