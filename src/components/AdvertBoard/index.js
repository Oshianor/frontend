import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    href:
      "https://www.accesswire.com/560634/First-Bitcoin-Capital-Corp-OTCBITCF-Incubator-Division-Announced-Tipestry-Inc-An-Innovative-Content-Monetization-And-Social-Media-Platform-As-Its-First-Client-Company",
    imgPath:
      "/static/adverts/bitcfnews.png"
  },
  {
    label: "Bird",
    href: "https://tipestry.com/topics/5d9397d496e2273b3425453b/post-of-the-week-thread",
    imgPath:
      "/static/adverts/potw-banner.png"
  }
];



function AdvertBoard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Typography variant="caption" style={{ fontSize: 15 }}>
        Advertisements
      </Typography>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <a href={step.href} target="_blank" key={step.label}>
            <div>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  // className="lozad"
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          </a>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}


export default AdvertBoard;


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    marginTop: 20
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 200,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  }
}));