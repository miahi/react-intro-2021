import styles from './Container.module.css';

const validDirections = ['vertical', 'horizontal'];

export const Container = ({
  children,
  className,
  direction = 'horizontal',
  wrap = false,
  split = false,
  center = false,
  lastRight = false,
  floaty = false,
  ...rest
}) => (
  <div
    {...rest}
    className={[
      className,
      styles.container,
      validDirections.includes(direction) && styles[direction],
      wrap && styles.wrap,
      split && styles.split,
      center && styles.center,
      lastRight && styles.testright,
      floaty && styles.floaty,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

export default Container;
