import CSVService from './csv-service';
import CSVRepository from '../db/repositories/csv-repository';

jest.mock('../db/repositories/csv-repository');

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

describe('CSVService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('load', () => {
    it('should parse CSV file and call csvRepository.create', async () => {
      const service = new CSVService();
      const createSpy = jest.spyOn(CSVRepository.prototype, 'create');

      await service.load(mockFile);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith([
        { name: 'John', city: 'Doe', country: 'USA', favorite_sport: 'Basketball' },
        { name: 'Alice', city: 'Smith', country: 'UK', favorite_sport: 'Tennis' },
      ]);
    });
  });

  describe('list', () => {
    it('should call csvRepository.list with filters', async () => {
      const mockFilters = { country: 'USA' };

      const service = new CSVService();
      const listSpy = jest.spyOn(CSVRepository.prototype, 'list');

      await service.list(mockFilters);

      expect(listSpy).toHaveBeenCalledTimes(1);
      expect(listSpy).toHaveBeenCalledWith(mockFilters);
    });

    it('should call csvRepository.list without filters if no filters are provided', async () => {
      const service = new CSVService();
      const listSpy = jest.spyOn(CSVRepository.prototype, 'list');

      await service.list();

      expect(listSpy).toHaveBeenCalledTimes(1);
    });
  });
});