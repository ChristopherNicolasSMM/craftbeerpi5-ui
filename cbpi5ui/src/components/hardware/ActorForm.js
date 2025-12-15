import { Breadcrumbs, Divider, Link, Paper, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCBPi } from "../data";
import ActorTypeSelect from "../util/ActorTypeSelect";
import PropsEdit from "../util/PropsEdit";

// Use theme + sx instead of makeStyles

const ActorForm = () => {
  const history = useHistory();
  const theme = useTheme();
  const paperSx = {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  };
  const buttonsSx = { display: "flex", justifyContent: "flex-end" };
  const buttonSx = { mt: 3, ml: 1 };
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const { id } = useParams();
  const { actor, state, actions } = useCBPi();
  const [propsConfig, setPropsConfig] = useState(null);
  const [props, setProps] = useState({})

  useEffect(() => {
    if (id) {
      const item = actor.find((item) => item.id === id);
      if (item) {
        setName(item.name);
        setType(item.type);
        setProps(item.props)
        if (item.type) {
          setPropsConfig(state.actorTypes.find((i) => i.name === item.type)?.properties);
        }
      }
    }
  }, []);

  const save = () => {
    const data = {
      name,
      type,
      props,
      config: {},
    };

    if (id) {
      actions.update_actor(id, data, () => history.push("/hardware"));
    } else {
      actions.add_actor(data, () => history.push("/hardware"));
    }
  };

  const onChangeProps = (name, value) => {
    console.log(name, value);
    setProps({...props, [name]: value})
  };

  const onChangeType = (e) =>  {
    const value = e.target.value
    setType(value)
    if (value) {
      setPropsConfig(state.actorTypes.find((i) => i.name === value)?.properties);
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Actor Config
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/hardware");
          }}
        >
          Actor
        </Link>
        <Typography color="textPrimary">{name}</Typography>
      </Breadcrumbs>

      <Divider />
      <Paper sx={paperSx}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="name" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorTypeSelect label="Type" value={type} onChange={onChangeType} />
          </Grid>

          <PropsEdit config={propsConfig} data={props} onChange={onChangeProps} />
        </Grid>
        <Box sx={buttonsSx}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/hardware");
            }}
            sx={buttonSx}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              save();
            }}
            sx={buttonSx}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default ActorForm;
