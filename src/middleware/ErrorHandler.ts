import { logger as log } from "../utils/Logging";

export function handleError(error, req, res, next) {
  const { method, url } = req;
  log.error(`${method} - ${url}: ${error.message}`);
  res.status(error.status || 500).json({ message: error.message });
}

export function tryCatch(): any {
  return (target, key, descriptor) => {
    const fn = descriptor.value;
    descriptor.value = async function (...args) {
      const [, , next] = args;
      try {
        await fn.apply(this, args);
      } catch (error) {
        next(error);
      }
    };
  };
}
