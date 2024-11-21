

export interface User {
  usu_code: number;
  usu_nombres?: string;
  usu_apellidos?: string;
  tipo_doc_code?: string;
  usu_identificacion?: string;
  usu_sexo?: string;
  usu_perfil: string;
  ciu_code?: string;
  usu_nacimiento?: string;
  usu_dir?: string;
  usu_tel?: string;
  usu_movil?: string;
  comp_code: string;
  usu_email?: string;
  usu_password?: string;
  usu_cedula?: string;
  usu_carga?: string;
  usu_activo: string;
  area_code?: string;
  plan_blindar?: string;
  nombres_o?: string;
  apellidos_o?: string;
  email_o?: string;
  telefono_o?: string;
  email_orientador?: string;
  orientador?: string;
  icfes_lenguaje?: string;
  icfes_matematicas?: string;
  icfes_fisica?: string;
  fecha_creacion: string;
  usu_registro?: string;
  usu_ultimo_login?: string;
  usu_admin: string;
  perf_code_ext?: string;
  form_seleccion?: string;
  updated_at?: string;
  ultimo_cambio_password?: string;
  debe_cambiar_password?: string;
  usu_idioma?: string;
  id_timezone_usu?: string;
  fecha_expedicion_documento?: string;
}
