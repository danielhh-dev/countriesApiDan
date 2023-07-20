const request = require("supertest");
const { Router } = require("express");
const activitiesRouter = require("../activitiesRouter"); // Ruta del archivo de la ruta

const app = Router();
app.use("/activities", activitiesRouter); // Agrega la ruta al enrutador de Express

describe("Pruebas de la ruta /activities", () => {
  test("POST /activities - Agregar una actividad", async () => {
    const activityData = {
      name: "Actividad de prueba",
      level: "Fácil",
      duration: 60,
      season: "Verano",
      countryid: "1",
    };

    const response = await request(app).post("/activities").send(activityData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual("Activity added");
  });

  test("GET /activities - Obtener todas las actividades", async () => {
    const response = await request(app).get("/activities");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2); // Ajusta el valor esperado según tus datos de prueba
  });

  test("POST /activities - Validación de datos faltantes", async () => {
    const activityData = {
      level: "Fácil",
      duration: 60,
      season: "Verano",
      countryid: "1",
    };

    const response = await request(app).post("/activities").send(activityData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Missing data, write a name for the activity",
    });
  });
});
