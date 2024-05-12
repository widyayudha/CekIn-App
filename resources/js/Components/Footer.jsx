export default function Footer(props) {
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
  };
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 MyWebsite. All rights reserved.</p>
    </footer>
  );

}
