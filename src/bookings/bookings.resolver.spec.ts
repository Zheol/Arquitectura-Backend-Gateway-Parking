import { Test, TestingModule } from '@nestjs/testing';



import { BookingsResolver } from './bookings.resolver';
import { CreateBookingInput } from './dto/create-booking.input';

import { of } from 'rxjs';




describe('BookingsResolver', () => {
  let resolver: BookingsResolver;
  let mockBookingsServiceClient;

  beforeEach(async () => {
    mockBookingsServiceClient = {
      getService: jest.fn().mockReturnValue({
        create: jest.fn().mockReturnValue(of({
          success: true,
          message: 'Booking created successfully',
        })),
        findAll: jest.fn().mockReturnValue(of({
          bookings: [
            {
              id: 1,
              dateHourStart: '2024-06-25T12:00:00Z',
              dateHourFinish: null,
              status: 'Activa',
              patente: 'ABC123',
              idZone: 1,
              idUser: 1,
            },
            {
              id: 2,
              dateHourStart: '2024-06-25T12:30:00Z',
              dateHourFinish: null,
              status: 'Activa',
              patente: 'XYZ789',
              idZone: 2,
              idUser: 2,
            },
          ],
        })),
        findOne: jest.fn().mockReturnValue(of({
          id: 1,
          dateHourStart: '2024-06-25T12:00:00Z',
          dateHourFinish: null,
          status: 'Activa',
          patente: 'ABC123',
          idZone: 1,
          idUser: 1,
        })),
        findAllByUser: jest.fn().mockReturnValue(of({
          bookings: [
            {
              id: 1,
              dateHourStart: '2024-06-25T12:00:00Z',
              dateHourFinish: null,
              status: 'Activa',
              patente: 'ABC123',
              idZone: 1,
              idUser: 1,
            },
          ],
        })),
        checkOut: jest.fn().mockReturnValue(of({
          success: true,
          message: 'Check out successful',
          booking: {
            id: 1,
            dateHourStart: '2024-06-25T12:00:00Z',
            dateHourFinish: '2024-06-25T14:00:00Z',
            status: 'Completed',
            patente: 'ABC123',
            idZone: 1,
            idUser: 1,
          },
        })),
        confirmBooking: jest.fn().mockReturnValue(of({
          success: true,
          message: 'Booking confirmed',
          booking: {
            id: 1,
            dateHourStart: '2024-06-25T12:00:00Z',
            dateHourFinish: null,
            status: 'Confirmed',
            patente: 'ABC123',
            idZone: 1,
            idUser: 1,
          },
        })),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsResolver,
        {
          provide: 'BookingsServiceClient',
          useValue: mockBookingsServiceClient,
        },
      ],
    }).compile();

    resolver = module.get<BookingsResolver>(BookingsResolver);
    resolver.onModuleInit();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createBooking should create a new booking and return the response', async () => {
    const createBookingInput: CreateBookingInput = {
      dateHourStart: '2024-06-25T12:00:00Z',
      patente: 'ABC123',
      idZone: 1,
      idUser: 1,
    };

    const result = await resolver.createBooking(createBookingInput);
    expect(result).toEqual({
      success: true,
      message: 'Booking created successfully',
    });
  });

  it('findAllBookings should return list of bookings', async () => {
    const result = await resolver.findAllBookings();
    expect(result).toEqual({
      bookings: [
        {
          id: 1,
          dateHourStart: '2024-06-25T12:00:00Z',
          dateHourFinish: null,
          status: 'Activa',
          patente: 'ABC123',
          idZone: 1,
          idUser: 1,
        },
        {
          id: 2,
          dateHourStart: '2024-06-25T12:30:00Z',
          dateHourFinish: null,
          status: 'Activa',
          patente: 'XYZ789',
          idZone: 2,
          idUser: 2,
        },
      ],
    });
  });

  it('findOneBooking should return booking details for a valid booking id', async () => {
    const result = await resolver.findOneBooking(1);
    expect(result).toEqual({
      id: 1,
      dateHourStart: '2024-06-25T12:00:00Z',
      dateHourFinish: null,
      status: 'Activa',
      patente: 'ABC123',
      idZone: 1,
      idUser: 1,
    });
  });

  it('findAllBookingsByUser should return list of bookings for a user', async () => {
    const result = await resolver.findAllBookingsByUser(1);
    expect(result).toEqual({
      bookings: [
        {
          id: 1,
          dateHourStart: '2024-06-25T12:00:00Z',
          dateHourFinish: null,
          status: 'Activa',
          patente: 'ABC123',
          idZone: 1,
          idUser: 1,
        },
      ],
    });
  });

  it('checkOutBooking should return checkOutBookingResponse', async () => {
    const result = await resolver.checkOutBooking(1, '2024-06-25T14:00:00Z');
    expect(result).toEqual({
      success: true,
      message: 'Check out successful',
      booking: {
        id: 1,
        dateHourStart: '2024-06-25T12:00:00Z',
        dateHourFinish: '2024-06-25T14:00:00Z',
        status: 'Completed',
        patente: 'ABC123',
        idZone: 1,
        idUser: 1,
      },
    });
  });

  it('confirmBooking should return checkOutBookingResponse', async () => {
    const result = await resolver.confirmBooking(1);
    expect(result).toEqual({
      success: true,
      message: 'Booking confirmed',
      booking: {
        id: 1,
        dateHourStart: '2024-06-25T12:00:00Z',
        dateHourFinish: null,
        status: 'Confirmed',
        patente: 'ABC123',
        idZone: 1,
        idUser: 1,
      },
    });
  });
});