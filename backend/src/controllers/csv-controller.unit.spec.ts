import { Request, Response } from "express";
import CSVService from "../services/csv-service";
import { UserFilters } from "../shared/types";
import CSVController from "../controllers/csv-controller";

jest.mock("../services/csv-service");

interface MockFile extends Express.Multer.File {
  buffer: Buffer;
  path: string;
}

const mockFile: MockFile = {
  fieldname: 'csvFile',
  originalname: 'data.csv',
  encoding: 'utf-8',
  mimetype: 'text/csv',
  size: 1234,
  destination: '/path/to/upload',
  filename: 'data.csv',
  buffer: Buffer.from('name,city,country,favorite_sport\nJohn,Doe,USA,Basketball\nAlice,Smith,UK,Tennis'),
  stream: null!,
  path: '/path/to/file',
};

describe("CSVController", () => {
  let csvController: CSVController;
  let csvService: CSVService;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    csvController = new CSVController();
    csvService = new CSVService();
    request = {} as Request;
    response = {} as Response;
  });

  describe("load", () => {
    beforeEach(() => {
      request.file = mockFile
      response.status = jest.fn().mockReturnThis();
      response.send = jest.fn();
      response.json = jest.fn();
    });

    it("should send a 400 response if request.file is not provided", async () => {
      request.file = undefined;

      await csvController.load(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.send).toHaveBeenCalledWith({
        message: "sending a csv file is required",
      });
    });

    it("should create a new CSVService if this.csvService is not defined", async () => {
      csvController.csvService = undefined;

      await csvController.load(request, response);

      expect(csvController.csvService).toBeInstanceOf(CSVService);
    });

    it("should call csvService.load with the file from the request", async () => {
      const file = {};
      csvController.csvService.load = jest.fn().mockResolvedValue(file);

      await csvController.load(request, response);

      expect(csvController.csvService.load).toHaveBeenCalledWith(request.file);
    });

    it("should send a 200 response with the result of csvService.load", async () => {
      const file = {};
      csvController.csvService.load = jest.fn().mockResolvedValue(file);

      await csvController.load(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(file);
    });

    it("should send a 400 response with the error message if an error occurs", async () => {
      const errorMessage = "Error message";
      csvController.csvService.load = jest.fn().mockRejectedValue(new Error(errorMessage));

      await csvController.load(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: errorMessage,
      });
    });
  });

  describe("list", () => {
    beforeEach(() => {
      response.status = jest.fn().mockReturnThis();
      response.json = jest.fn();
      request.query = {};
    });

    it("should create a new CSVService if this.csvService is not defined", async () => {
      csvController.csvService = undefined;

      await csvController.list(request, response);

      expect(csvController.csvService).toBeInstanceOf(CSVService);
    });

    it("should call csvService.list with the filters from the request", async () => {
      const filters: UserFilters = { name: "John" };
      csvController.csvService.list = jest.fn().mockResolvedValue([]);

      await csvController.list({ query: filters } as Request, response);

      expect(csvController.csvService.list).toHaveBeenCalledWith(filters);
    });

    it("should send a 200 response with the result of csvService.list", async () => {
      const users = [{ name: "John" }];
      csvController.csvService.list = jest.fn().mockResolvedValue(users);

      await csvController.list(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(users);
    });

    it("should send a 400 response with the error message if an error occurs", async () => {
      const errorMessage = "Error message";
      csvController.csvService.list = jest.fn().mockRejectedValue(new Error(errorMessage));

      await csvController.list(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        message: errorMessage,
      });
    });
  });
});