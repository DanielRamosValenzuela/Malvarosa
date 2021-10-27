import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "black",
    fontWeight: "700",
  },
  img: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
