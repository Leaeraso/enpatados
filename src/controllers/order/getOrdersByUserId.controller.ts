import { Request, Response } from 'express';
import { customError } from '../../helpers/error.helper';
import orderService from '../../services/order/index.services';

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const { page = 1, pageSize = 10 } = req.query;

    const { orders, totalPages, count } = await orderService.getOrdersByUserId(
      Number(userId),
      Number(page),
      Number(pageSize)
    );

    res.status(200).json({
      data: orders,
      pagination: {
        currentPage: +page,
        totalPages,
        totalRecords: count,
        pageSize: +pageSize,
      },
    });
  } catch (error) {
    if (error instanceof customError) {
      res.status(error.httpStatus).json({ error: error.message });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  }
};

export default getOrdersByUserId;
