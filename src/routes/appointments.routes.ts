import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/ApponitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter
  .use(ensureAuthenticated)
  .get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return res.status(200).json(appointments);
  })
  .post('/', async (req, res) => {
    try {
      const { provider_id, date } = req.body;

      const parseDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parseDate,
        provider_id,
      });
      return res.status(200).json(appointment);
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  });

export default appointmentsRouter;
