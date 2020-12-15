import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/ApponitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter
  .get('/appointments', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return res.status(200).json(appointments);
  })
  .post('/appointments', async (req, res) => {
    try {
      const { provider, date } = req.body;

      const parseDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parseDate,
        provider,
      });
      return res.status(200).json(appointment);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

export default appointmentsRouter;
