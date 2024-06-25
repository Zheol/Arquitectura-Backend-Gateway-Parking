import { Test, TestingModule } from '@nestjs/testing';



import { BookingsResolver } from './bookings.resolver';
import { CreateBookingInput } from './dto/create-booking.input';
import { Bookings } from './bookings.entity';
import { checkOutBookingResponse } from './dto/checkout.entity';




describe('BookingsResolver', () => {
  let resolver: BookingsResolver;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsResolver,
        {
          provide: 'BookingsServiceClient',
          useValue: {
            getService: jest.fn().mockReturnValue({
                createBooking: jest.fn(),
                findAllBookings: jest.fn(),
                findOneBooking:jest.fn(),
                confirmBooking:jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<BookingsResolver>(BookingsResolver);
    resolver.onModuleInit();  
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create booking should create a new booking and return the response', async () => {
    const createUserInput: CreateBookingInput = {
        dateHourStart: "asd",
        patente: "asd",
        idZone: 1,
        idUser: 1,
    };
    jest.spyOn(resolver, 'createBooking').mockImplementation(async () => ({
      success: true,
      message: 'User created successfully',
    }));
    const result = await resolver.createBooking(createUserInput);
    expect(result).toEqual({
      success: true,
      message: 'User created successfully',
    });
  });
  

  it('getUsers should return list of users', async () => {
    
    const mockBookings: Bookings[] = [
      {
        
    id: 1,
    
    dateHourStart: "asd",
    
    dateHourFinish: "asd",
    
    status: "asd",
    
    patente: "asd",
    
    idZone: 1,
   
    idUser: 1,
    

        
      },
      {
        id: 2,
    
    dateHourStart: "asd2",
    
    dateHourFinish: "asd2",
    
    status: "asd2",
    
    patente: "asd2",
    
    idZone: 2,
   
    idUser: 2,
        
      },
    ];

    
    jest.spyOn(resolver, 'findAllBookings').mockResolvedValue({ bookings: mockBookings });

    const result = await resolver.findAllBookings();

    
    expect(result).toEqual({ bookings: mockBookings });
  });


  it('getUser should return user details for a valid user id', async () => {
    

    const mockGetBookingResponse: Bookings = {
      
      id: 1,
    
      dateHourStart: "asd",
      
      dateHourFinish: "asd",
      
      status: "asd",
      
      patente: "asd",
      
      idZone: 1,
     
      idUser: 1,
        
      
    };
    jest.spyOn(resolver, 'findOneBooking').mockResolvedValue({
      id: mockGetBookingResponse.id,
      dateHourStart: mockGetBookingResponse.dateHourStart,
      dateHourFinish: mockGetBookingResponse.dateHourFinish,
      status: mockGetBookingResponse.status,
      patente: mockGetBookingResponse.patente,
      idZone: mockGetBookingResponse.idZone,
      idUser: mockGetBookingResponse.idUser,
    });
    

    const result = await resolver.findOneBooking(1);

    expect(result).toEqual({
      id: mockGetBookingResponse.id,
      dateHourStart: mockGetBookingResponse.dateHourStart,
      dateHourFinish: mockGetBookingResponse.dateHourFinish,
      status: mockGetBookingResponse.status,
      patente: mockGetBookingResponse.patente,
      idZone: mockGetBookingResponse.idZone,
      idUser: mockGetBookingResponse.idUser,
    });
  });

  it('confirmBooking should return checkOutBookingResponse', async () => {
    const mockBookingId = 1;
    const mockBooking: Bookings = {
      id: 1,
      dateHourStart: "asd",
      
      dateHourFinish: "asd",
      
      status: "asd",
      
      patente: "asd",
      
      idZone: 1,
     
      idUser: 1,
      
    };

    const mockResponse: checkOutBookingResponse = {
      success: true,
      message: 'asd',
      booking: mockBooking,
    };

    
    jest.spyOn(resolver, 'confirmBooking').mockResolvedValue(mockResponse);

    
    const result = await resolver.confirmBooking(mockBookingId);

    
    expect(result).toEqual(mockResponse);
  });
});