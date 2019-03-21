const Koa = require('koa')
const bodyParser = require('koa-body')
const Joi = require('joi');

const app = new Koa()

app.use(bodyParser())

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).[a-zA-Z0-9]{7,30}$/).required()
})

app.use(async ctx => {
  const postBody = await ctx.request.body
  Joi.validate(postBody, schema, function (err) {
    if (err) {
      ctx.status = 400
      ctx.body = err
    } else {
      ctx.body = postBody
    }
  })
})

module.exports = app.callback()