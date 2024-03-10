const mongoose = require('mongoose');
const connectDB = require('../../config/db');

jest.mock('mongoose');


describe('checking database connection function', () => {

    jest.spyOn(console, 'error');

    it('SHOULD connect to the database', async () => {
        mongoose.connect.mockResolvedValue({
            connection: {
                host: 'localhost'
            }
        });
        await connectDB();
        expect(mongoose.connect).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });

    it('SHOULD handle connection timeout error', async () => {

        const error = new Error('Connection Timeout');
        mongoose.connect.mockRejectedValue(error);
        await connectDB();
        expect(mongoose.connect).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(error);
    });

});
