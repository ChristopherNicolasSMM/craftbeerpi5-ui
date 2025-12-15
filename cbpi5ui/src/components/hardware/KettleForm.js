import { Breadcrumbs, Divider, Link, Paper, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCBPi } from "../data";
import ActorSelect from "../util/ActorSelect";
import LogicSelect from "../util/LogicSelect";
import PropsEdit from "../util/PropsEdit";
import SensorSelect from "../util/SensorSelect";

// Use theme + sx instead of makeStyles

const KettleForm = () => {
  
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
  const [heater, setHeater] = useState("");
  const [agitator, setAgitator] = useState("");
  const [sensor, setSensor] = useState("");
  const { kettle, state, actions } = useCBPi();
  const [propsConfig, setPropsConfig] = useState(null);
  const [props, setProps] = useState({});

  const save = () => {
    const data = {
      name,
      sensor,
      heater,
      agitator,
      type,
      props,
    };

    if (id) {
      actions.update_kettle(id, data, () => history.push("/hardware"));
    } else {
      actions.add_kettle(data, () => history.push("/hardware"));
    }
  };

  useEffect(() => {
    if (id) {
      const item = kettle.find((item) => item.id === id);
      if (item) {
        setName(item.name);
        setHeater(item.heater);
        setAgitator(item.agitator);
        setType(item.type);
        setSensor(item.sensor);
        setProps(item.props);
        if (item.type) {
          setPropsConfig(state.logic.find((i) => i.name === item.type)?.properties);
        }
      }
    }
  }, []);

  const onChangeProps = (name, value) => {
    setProps({ ...props, [name]: value });
  };

  const onChangeType = (e) =>  {
    const value = e.target.value
    setType(value)
    if (value) {
      setPropsConfig(state.logic.find((i) => i.name === value)?.properties);
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Kettle Config
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/hardware");
          }}
        >
          Kettle
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
            <LogicSelect value={type} onChange={onChangeType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Heater" value={heater} onChange={(e) => setHeater(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActorSelect label="Agitator" value={agitator} onChange={(e) => setAgitator(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SensorSelect value={sensor} onChange={(e) => setSensor(e.target.value)} />
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

export default KettleForm;
