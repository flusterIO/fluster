export const swipeConfidenceThreshold = 10000;
export const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};
