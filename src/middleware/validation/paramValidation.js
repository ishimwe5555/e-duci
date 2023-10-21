export default function validateUUID(schema) {
  return (req, res, next) => {
    const Validate = schema.validate(req.params);

    if (Validate.error) {
      res.status(406).send({
        code: 406,
        error: Validate.error.message,
      });
    } else {
      next();
    }
  };
}
