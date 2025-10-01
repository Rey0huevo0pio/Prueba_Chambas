export const HAZARD_PICTOGRAMS = [
  { id: 'flammable', label: 'Inflamable', icon: '🔥' },
  { id: 'toxic', label: 'Tóxico', icon: '☠️' },
  { id: 'corrosive', label: 'Corrosivo', icon: '⚠️' },
  { id: 'explosive', label: 'Explosivo', icon: '💥' },
  { id: 'oxidizing', label: 'Oxidante', icon: '⚡' },
  { id: 'health-hazard', label: 'Peligro para la salud', icon: '🚑' },
  { id: 'environment', label: 'Peligro ambiental', icon: '🌍' },
];

export const HAZARD_PHRASES = [
  { code: 'H315', text: 'Causa irritación cutánea' },
  { code: 'H318', text: 'Provoca graves lesiones oculares' },
  { code: 'H335', text: 'Puede irritar las vías respiratorias' },
  { code: 'H301', text: 'Tóxico en caso de ingestión' },
  { code: 'H311', text: 'Tóxico en contacto con la piel' },
  { code: 'H370', text: 'Provoca daños en los órganos' },
];

export const TOOL_TYPES = [
 { id: 'vaso', label: 'Vaso de precipitado' },
  { id: 'pipeta', label: 'Pipeta' },
  { id: 'bureta', label: 'Bureta' },
  { id: 'matraz', label: 'Matraz' },
  { id: 'probeta', label: 'Probeta' },
  { id: 'otros', label: 'Otros' },
];

export const INITIAL_FORM_DATA = {
  nombre: '',
    formula: '',
    cantidad: '',
    numeroLote: '',
    concentracion: '',
    descripcion: '',
    primerosAuxilios: '',
    manejoSeguro: '',
    pictogramasPeligro: [],
    frasesPeligro: [],
    tipoHerramienta: '',
    especificarTipo: '',
    estado: '',
    numeroSerie: '',
};