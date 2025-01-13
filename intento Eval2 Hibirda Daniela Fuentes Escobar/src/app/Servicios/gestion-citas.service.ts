import { Injectable } from '@angular/core';
import { Cita } from '../Modelo/Cita';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class GestionCitasService {
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);  // Definimos sqlite
  db!: SQLiteDBConnection;
  plataforma: string = "";  // Definimos plataforma
  permitirBorrarCita: boolean = false; // Control de borrar cita
  DB_NAME: string = "Citas";  // Nombre de la base de datos
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "Lista_Citas";
  COL_FRASE: string = "frase";
  COL_AUTOR: string = "autor";
  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} ( 
   id NUMBER PRIMARY KEY AUTOINCREMENT,
   ${this.COL_FRASE} TEXT NOT NULL,
   ${this.COL_AUTOR} TEXT NOT NULL
   );
   `;

  constructor() {}

  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector("jeep-sqlite");
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform();  // Recuperamos la plataforma
    if (this.plataforma == "web") {  // Si es plataforma web, iniciamos el plugin
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();  // Abrimos la conexión a la base de datos
    await this.db.execute(this.DB_SQL_TABLAS);  // Creamos las tablas si no existen

    const citasExistentes = await this.getCitas();
    if (citasExistentes.length === 0) {
      await this.agregarCita({ frase: "Lo único que tenemos que temer es al miedo mismo.", autor: "Franklin D. Roosevelt" });
      await this.agregarCita({ frase: "La paz comienza con una sonrisa.", autor: "Madre Teresa de Calcuta" });
      await this.agregarCita({ frase: "El que tiene un porqué para vivir puede soportar casi cualquier cómo.", autor: "Friedrich Nietzsche" });
    }
  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }
    await this.db.open();
  }
  async agregarCita(c: Cita): Promise<void> {
    const frase = c.frase || '';
    const autor = c.autor || '';
    const sql = `INSERT INTO ${this.TABLE_NAME} (${this.COL_FRASE}, ${this.COL_AUTOR}) VALUES (?, ?)`;
  
    console.log('Ejecutando consulta para agregar cita:', sql, [frase, autor]);
  
    await this.db.run(sql, [frase, autor]);
  
    console.log('Cita agregada correctamente');
  }

  async getCitas(): Promise<Cita[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`;
    const resultado = await this.db.query(sql);
    
    console.log('Resultado de obtener citas:', resultado);
  
    return resultado?.values ?? [];
  }
  
  async eliminarCita(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    const params = [id];  
    await this.db.run(sql, params);
  }
  

  async actualizarCita(id: number, nuevaFrase: string, nuevoAutor: string): Promise<void> {
    const sql = `UPDATE ${this.TABLE_NAME} SET frase = ?, autor = ? WHERE id = ?`;
    const params = [nuevaFrase, nuevoAutor, id];
    await this.db.run(sql, params);
  }

  async obtenerCitaAleatoria(): Promise<Cita | null> {
    try {
      const sql = `SELECT * FROM ${this.TABLE_NAME} ORDER BY RANDOM() LIMIT 1`;
      const resultado = await this.db.query(sql);
      if (resultado?.values && resultado?.values.length > 0) {
        const cita = resultado.values[0];
        return { id: cita.id, frase: cita.frase, autor: cita.autor } as Cita;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener cita aleatoria: ", error);
      return null;
    }
  }

  // Guardar la configuración de mostrar cita aleatoria
  async guardarConfiguracion(mostrarCitaAleatoria: boolean) {
    await Preferences.set({
      key: 'mostrarCitaAleatoria',
      value: JSON.stringify(mostrarCitaAleatoria),  // Guardamos el valor como string
    });
  }

  // Recuperar la configuración de mostrar cita aleatoria
  async obtenerConfiguracion(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'mostrarCitaAleatoria' });
    if (value !== null) {
      return JSON.parse(value);  // Parseamos el valor de string a booleano
    }
    return true;  // Por defecto mostramos la cita aleatoria
  }

  
}

