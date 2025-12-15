import { Breadcrumbs, Divider, Link, Paper, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "../alert/AlertProvider";
import { CBPiContext, useCBPi } from "../data";
import { stepapi } from "../data/stepapi";
import PropsEdit from "../util/PropsEdit";
import StepTypeSelct from "../util/StepTypeSelect";

const samplePropsConfig = [
  {
    label: "Parameter1",
    type: "number",
    configurable: true,
    description: "",
    default_value: null,
  },
  {
    label: "Parameter2",
    type: "text",
    configurable: true,
    default_value: "HALLO",
    description: "",
  },
];

// NOTE: Previously used makeStyles here; migrated to sx props.

const StepForm = () => {
  const history = useHistory();
  const alert = useAlert();
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [props, setProps] = useState({})
  const [propsConfig, setPropsConfig] = useState(null);
  const { id } = useParams();
  const { state } = useCBPi();

  const { actions } = useContext(CBPiContext);

  const save = () => {
    const data = {
      name,
      type,
      props,
    };

    if (id) {
      stepapi.save(id, data, (data) => {
        
        history.push("/mashprofile");
      });
    } else {
      stepapi.add(data, (data) => {
        
        history.push("/mashprofile");
      });
    }
  };
  const onSelectType = (e) => {
    const name = e.target.value;
    setType(name);
    const type2 = state.stepTypes.find((item) => item.name === name);
    setPropsConfig(type2?.properties);
  };
  const onChangeProps = (name, value) => setProps({...props, [name]: value})


  useEffect(() => {
    if (id) {
      const k = actions.get_step_by_id(id);

      if (k) {
        setName(k.name);
        setType(k.type);
        setProps(k.props)
        if (k.type) {
          setPropsConfig(state.stepTypes.find((item) => item.name === k.type)?.properties);
        }
      }
    }
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Step Config
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => {
            history.push("/mashprofile");
          }}
        >
          Mash Profile
        </Link>
        <Typography color="textPrimary">{name}</Typography>
      </Breadcrumbs>

      <Divider />
      <Paper
        sx={(theme) => ({
          mt: 3,
          mb: 3,
          p: 2,
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            mt: 6,
            mb: 6,
            p: 3,
          },
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="name" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <StepTypeSelct value={type} onChange={onSelectType} />
          </Grid>

          <PropsEdit config={propsConfig} data={props} onChange={onChangeProps} />
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/mashprofile");
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              save();
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default StepForm;
