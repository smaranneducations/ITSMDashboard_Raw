import React from 'react';

const ScenarioComponent = () => {
  return (
    <div style={styles.container}>
      {/* First Row */}
      <div style={styles.row}>
        <div style={{ ...styles.column, backgroundColor: 'red' }}>Dummy Text 1</div>
        <div style={{ ...styles.column, backgroundColor: 'green' }}>Dummy Text 2</div>
        <div style={{ ...styles.column, backgroundColor: 'blue' }}>Dummy Text 3</div>
      </div>
      {/* Second Row */}
      <div style={styles.row}>
        <div style={{ ...styles.column, backgroundColor: 'yellow' }}>Dummy Text 4</div>
        <div style={{ ...styles.column, backgroundColor: 'orange' }}>Dummy Text 5</div>
        <div style={{ ...styles.column, backgroundColor: 'purple' }}>Dummy Text 6</div>
      </div>
      {/* Third Row */}
      <div style={styles.row}>
        <div style={{ ...styles.column, backgroundColor: 'pink' }}>Dummy Text 7</div>
        <div style={{ ...styles.column, backgroundColor: 'cyan' }}>Dummy Text 8</div>
        <div style={{ ...styles.column, backgroundColor: 'magenta' }}>Dummy Text 9</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  row: {
    display: 'flex',
    flex: 1,
  },
  column: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

export default ScenarioComponent;
