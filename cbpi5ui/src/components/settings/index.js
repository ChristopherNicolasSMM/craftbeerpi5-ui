/**
 * Página de Configurações (Settings)
 * 
 * Esta página permite gerenciar todas as configurações do sistema CraftBeerPi.
 * 
 * Funcionalidades:
 * - Visualizar todas as configurações em formato de tabela
 * - Filtrar configurações por nome
 * - Editar valores de configuração
 * - Salvar alterações
 * - Resetar alterações não salvas
 * 
 * Tipos de configuração suportados:
 * - select: Dropdown com opções
 * - kettle: Seletor de panela
 * - fermenter: Seletor de fermentador
 * - sensor: Seletor de sensor
 * - step: Seletor de tipo de etapa
 * - actor: Seletor de atuador
 * - number: Campo numérico
 * - string: Campo de texto (padrão)
 */

import {
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Chip,
  Box,
  Tooltip,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { useEffect, useState } from "react";
import { useAlert } from "../alert/AlertProvider";
import { useCBPi } from "../data";
import { configapi } from "../data/configapi";
import ActorSelect from "../util/ActorSelect";
import KettleSelect from "../util/KettleSelect";
import FermenterSelect from "../util/FermenterSelect";
import SensorSelect from "../util/SensorSelect";
import StepTypeSelect from "../util/StepTypeSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  title: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "0.95rem",
  },
  actionButtons: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f5f5f5',
  },
  tableRow: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  parameterCell: {
    fontWeight: 500,
  },
  description: {
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    fontStyle: "italic",
  },
  changedIndicator: {
    marginLeft: theme.spacing(1),
  },
  emptyState: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  statsChip: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * Componente SelectBox para dropdowns
 */
const SelectBox = ({ options, value, onChange }) => {
  return (
    <Select
      labelId="config-select-label"
      id="config-select"
      value={value || ""}
      onChange={onChange}
      variant="outlined"
      fullWidth
      style={{ minWidth: 200 }}
    >
      {options && options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label || item.value}
        </MenuItem>
      ))}
    </Select>
  );
};

/**
 * Componente ConfigInput - Renderiza o input apropriado baseado no tipo
 */
const ConfigInput = ({ item, onChange, value, options }) => {
  switch (item.type) {
    case "select":
      return <SelectBox options={options} value={value} onChange={onChange} />;
    case "kettle":
      return <KettleSelect value={value} onChange={onChange} label="" />;
    case "fermenter":
      return <FermenterSelect value={value} onChange={onChange} label="" />;
    case "sensor":
      return <SensorSelect value={value} onChange={onChange} label="" />;
    case "step":
      return <StepTypeSelect value={value} onChange={onChange} label="" />;
    case "actor":
      return <ActorSelect description={item.description} value={value} onChange={onChange} />;
    case "number":
      return (
        <TextField
          type="number"
          onChange={onChange}
          value={value || ""}
          variant="outlined"
          size="small"
          style={{ minWidth: 200 }}
        />
      );
    default:
      return (
        <TextField
          onChange={onChange}
          value={value || ""}
          variant="outlined"
          size="small"
          fullWidth
          style={{ minWidth: 200 }}
        />
      );
  }
};

/**
 * Componente principal Settings
 */
const Settings = () => {
  const { config: state } = useCBPi();
  const [config, setConfig] = useState({});
  const [filter, setFilter] = useState("");
  const classes = useStyles();
  const alert = useAlert();

  // Inicializa o estado com as configurações do contexto
  useEffect(() => {
    if (state) {
      setConfig({ ...state });
    }
  }, [state]);

  /**
   * Handler para mudanças nos campos de configuração
   */
  const onChange = (field, e) => {
    setConfig({
      ...config,
      [field]: {
        ...config[field],
        changed: true,
        value: e.target.value,
      },
    });
  };

  /**
   * Salva todas as alterações pendentes
   */
  const save = () => {
    let savedCount = 0;
    Object.keys(config).forEach((key) => {
      const parameter = config[key];
      if (parameter.changed) {
        configapi.update(key, parameter.value);
        setConfig((currentConfig) => ({
          ...currentConfig,
          [key]: { ...currentConfig[key], changed: false },
        }));
        savedCount++;
      }
    });
    
    if (savedCount > 0) {
      alert.success(`Configurações salvas: ${savedCount} alteração(ões)`);
    } else {
      alert.info("Nenhuma alteração para salvar");
    }
  };

  /**
   * Reseta todas as alterações não salvas
   */
  const reset = () => {
    setConfig({ ...state });
    alert.info("Alterações descartadas");
  };

  // Filtra as configurações baseado no filtro de busca
  let filteredData = config;
  if (filter) {
    filteredData = Object.keys(config)
      .filter((key) => 
        key.toLowerCase().includes(filter.toLowerCase()) ||
        (config[key].description && config[key].description.toLowerCase().includes(filter.toLowerCase()))
      )
      .reduce((obj, key) => {
        obj[key] = config[key];
        return obj;
      }, {});
  }

  // Conta configurações alteradas
  const changedCount = Object.keys(config).filter(
    (key) => config[key].changed
  ).length;

  // Conta total de configurações
  const totalCount = Object.keys(config).length;
  const filteredCount = Object.keys(filteredData).length;

  return (
    <div className={classes.root}>
      {/* Cabeçalho */}
      <Grid container spacing={2} alignItems="center" className={classes.header}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Configurações
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Gerencie as configurações do sistema CraftBeerPi
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" flexWrap="wrap" gap={1}>
            {changedCount > 0 && (
              <Chip
                icon={<CheckCircleIcon />}
                label={`${changedCount} alteração(ões) pendente(s)`}
                color="warning"
                size="small"
                className={classes.statsChip}
              />
            )}
            <Chip
              label={`${filteredCount} de ${totalCount} configurações`}
              size="small"
              variant="outlined"
              className={classes.statsChip}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Barra de busca e ações */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: 16 }}>
        <Grid item xs={12} md={8}>
          <Paper component="form" className={classes.searchContainer} elevation={1}>
            <SearchIcon color="action" />
            <InputBase
              className={classes.searchInput}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar configurações..."
              inputProps={{ "aria-label": "buscar configurações" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className={classes.actionButtons} justifyContent="flex-end">
            <Tooltip title="Descartar alterações">
              <IconButton
                onClick={reset}
                disabled={changedCount === 0}
                color="default"
                aria-label="reset"
              >
                <RotateLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Salvar alterações">
              <IconButton
                onClick={save}
                disabled={changedCount === 0}
                color="primary"
                aria-label="save"
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      {/* Tabela de configurações */}
      <TableContainer component={Paper} className={classes.tableContainer}>
        {filteredCount === 0 ? (
          <Box className={classes.emptyState}>
            <Typography variant="body1" color="textSecondary">
              Nenhuma configuração encontrada
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
              Tente ajustar o filtro de busca
            </Typography>
          </Box>
        ) : (
          <Table className={classes.table} aria-label="tabela de configurações">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                    Parâmetro
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                    Valor
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(filteredData).map((key) => {
                const configItem = config[key];
                const isChanged = configItem?.changed;
                
                return (
                  <TableRow
                    key={key}
                    selected={isChanged}
                    className={classes.tableRow}
                  >
                    <TableCell component="th" scope="row" className={classes.parameterCell}>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1">{key}</Typography>
                        {isChanged && (
                          <Chip
                            label="Alterado"
                            size="small"
                            color="warning"
                            className={classes.changedIndicator}
                          />
                        )}
                      </Box>
                      {configItem?.description && (
                        <Typography className={classes.description}>
                          {configItem.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <ConfigInput
                        onChange={(e) => onChange(key, e)}
                        item={configItem}
                        value={configItem?.value}
                        options={configItem?.options}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default Settings;
