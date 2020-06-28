module.exports.valid = (key, type) => {
  console.log(`[환경변수 valid 체크중!] ${key}: ${type}`);
  const isValid = typeChecker[type];
  if (!isValid) {
    throw new Error(`타입 ${type}에 해당하는 메서드가 없습니다`);
  }
  if (!isValid(process.env[key])) {
    throw new Error(`process.env.${key}에 값이 없거나 적절한 값이 아닙니다`);
  }
};

module.exports.invalid = (key, type) => {
  console.log(`[환경변수 invalid 체크중!] ${key}: ${type}`);
  const isValid = typeChecker[type];
  if (!isValid) {
    throw new Error(`타입 ${type}에 해당하는 메서드가 없습니다`);
  }
  if (isValid(process.env[key])) {
    throw new Error(`process.env.${key}에는 값을 지정할 수 없습니다`);
  }
};

const typeChecker = {
  boolean(value) {
    switch (value) {
      case "true":
      case "false": {
        return true;
      }
    }
    return false;
  },
  number(value) {
    return !Number.isNaN(+value);
  },
  string(value) {
    return typeof value === "string";
  }
};
