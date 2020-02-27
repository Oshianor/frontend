import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { config } from "../../../../config";
import TagButton from "../../TagButton";
import { connect } from "react-redux";
import Router from "next/router";



const mapStateToProps = state => ({
  user: state.user
})


const ImagePost = props => {
  const classes = useStyles();
  const { user } = props;
	const [val, setVal] = useState({
		title: "",
    details: "",
    tag: ""
	});
	const [img, setImg] = useState(null);
	const [chipData, setChipData] = useState([]);
	const [base64, setBase64] = useState(null);
	const [loading, setLoading] = useState(false);
  const [res, setRes] = React.useState({
    msg: "",
    err: false,
    status: ""
  });

  console.log("chipData", chipData);
  

	const handleChange = name => event => {
		setVal({
			...val,
			[name]: event.target.value
		})
	}

	const getBase64 = () => {
		const file = event.target.files[0];
		setImg(event.target.files[0]);

		let self = this;

		let reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = function() {
			console.log(reader.result);
			setBase64(reader.result);
		};
		reader.onerror = function(error) {
			console.log("Error: ", error);
		};
	};

  const handleImagePost = async () => {
    try {
      if (val.title === "") {
        setRes({
          err: true,
          msg: "Title is required",
          status: "warning"
        });
        return;
      }

      if (!img) {
        setRes({
          err: true,
          msg: "Image is required",
          status: "warning"
        });
        return;
      }

      setLoading(true);
      const tags = [];
      chipData.forEach(tag => {
        tags.push(tag.label);
      });

      const formData = new FormData();
      formData.append("img", img);
      formData.append("title", val.title);
      formData.append("message", val.details);
      formData.append("tags", JSON.stringify(tags));

      const upload = await axios({
        method: "post",
        headers: {
          // "x-auth-token": account.token,
          "Content-Type": "multipart/form-data"
        },
        url: config.uploadImgPost,
        data: formData
      });

      console.log("upload", upload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      console.log("error", error.response);
    }
  }


  const handleTextPost = async () => {
    try {
      if (val.title === "") {
        setRes({
          err: true,
          msg: "Title is required",
          status: "warning"
        });
        return;
      }

      setLoading(true);
      const tags = [];
      chipData.forEach(tag => {
        tags.push(tag.label);
      });

      const headers = user.token ? { "x-auth-token": user.token } : {};
      const upload = await axios.post(
        config.uploadTextPost,
        {
          title: val.title,
          message: val.details,
          tags
        },
        {
          headers: {
            headers
          }
        }
      );

      console.log("upload", upload);
      setLoading(false);
      Router.push("/recent");
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      console.log("error", error.response);
    }
  }


	const handlePost = async () => {
    if (img) {
      handleImagePost();
    } else {
      handleTextPost();
    }
	}


  const handleChangeTag = e => {

    if (e.keyCode === 32 || e.key === " " || e.key === "Spacebar") {
      let data = [];
      chipData.forEach(chip => {
        data.push(chip.label);
      });

      if (!data.includes(val.tag) && chipData.length <= 4) {
        chipData.push({
          key: val.tag + Math.floor(Math.random() * 10 + 1),
          label: val.tag.toLocaleLowerCase().replace(/[^A-Z0-9]+/gi, "")
        });

        setChipData(chipData);
        setVal({
          ...val,
          tag: ""
        });
      }
    }
  };

  const handleTagRender = () => {
    return chipData.map(tag => (
      <TagButton key={tag.key} name={tag.label} />
    ));
  };

  const handleDelete = data => {
    // const { chipData } = this.state;
    // console.log(chipData.filter(chip => chip.key !== data.key));

    setChipData(chipData.filter(chip => chip.key !== data.key));
  };


	return (
    <>
      <DialogContent className={classes.content}>
        <form className={classes.root} noValidate autoComplete="off">
          {base64 && <img src={base64} className={classes.img} />}
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            onChange={getBase64}
            type="file"
          />
          <div>
            <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              component="span"
            >
              Upload
            </Button>
          </label>
            <Button
              variant="outlined"
              disabled={!img}
              style={{ color: "red" }}
              size="small"
              component="span"
            >
              remove
            </Button>
          </div>
          
          <TextField
            id="outlined-basic"
            value={val.title}
            fullWidth
            label="Title"
            onChange={handleChange("title")}
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            value={val.details}
            label="Details"
            onChange={handleChange("details")}
            multiline
            rows={3}
            rowsMax={5}
            variant="outlined"
            margin="dense"
          />
        </form>
        {/* <form onSubmit={handleChangeTag} className={classes.root}> */}
          <div className={classes.tag}>{handleTagRender()}</div>

          <TextField
            required
            id="name"
            onChange={handleChange("tag")}
            onKeyUp={handleChangeTag}
            value={val.tag}
            label="Add Tag"
            margin="dense"
            placeholder="Enter a hashtag and press spacebar"
            // size="small"
            fullWidth
            variant="outlined"
          />
        {/* </form> */}
      </DialogContent>
      <DialogActions>
        <Button
          // onClick={() => }
          color="default"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handlePost}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : "Save Post"}
        </Button>
      </DialogActions>
    </>
  );
}

ImagePost.propTypes = {

}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    // alignItems: "flex-start",
    flexDirection: "column",
    width: "100%"
    // "& > *": {
    //   margin: theme.spacing(1)
    // }
  },
  input: {
    display: "none"
  },
  img: {
    height: 200,
    width: "auto"
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  tag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}));

export default connect(mapStateToProps)(ImagePost)
