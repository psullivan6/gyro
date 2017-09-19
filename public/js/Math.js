export const getRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const normalizeValue = (inputValue, inputScale, outputScale) => {
  if (!Array.isArray(inputScale) || !Array.isArray(outputScale)) {
    throw new Error('normalizeValue function - Both the "inputScale" and "outputScale" arguments must be arrays');
  }

  const inputMin = inputScale[0];
  const inputMax = inputScale[1];

  const outputMin = outputScale[0];
  const outputMax = outputScale[1];

  const percent = (inputValue - inputMin) / (inputMax - inputMin);
  const output = percent * (outputMax - outputMin) + outputMin;

  if (output < outputMin) {
    return outputMin;
  }

  if (output > outputMax) {
    return outputMax;
  }

  return output;
};

export const lerp = (initialValue, endValue, blending) => {
  return (1 - blending) * initialValue + blending * endValue;
}