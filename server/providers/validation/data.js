import Joi from 'joi'
import constants from '../../constants'
export default {
  // GET /api/data
  getData: {
    params: {
      offset: Joi.number().min(0).required(),
      pageLength: Joi.number().max(constants.MAX_SUPPORTED_PAGE_LENGTH).required(),
    }
  },

  // GET-PUT-DELETE /api/tasks/:taskId
  getTask: {
    params: {
      taskId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },

  // PUT /api/tasks/:taskId
  updateTask: {
    body: {
      user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      description: Joi.string(),
      done: Joi.boolean()
    }
  }
}
