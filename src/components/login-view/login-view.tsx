import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { Link } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./login-view.scss";
import type { User } from "../../types/user";


type LoginResponse = {
  user: Omit<User, "token">;
  token: string;
};

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setIsLoading(true);
  setMessage("");

  const data = {
    Username: username,
    Password: password,
  };

  try {
    const response = await fetch(
      "https://movie-api-o14j.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Username or password is incorrect.");
    }

    const loginData: LoginResponse = await response.json();

    const userData = {
      ...loginData.user,
      token: loginData.token,
    };

    localStorage.setItem("userInfo", JSON.stringify(userData));
    dispatch(setUser(userData));

  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow auth-card" style={{ maxWidth: "400px" }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={7}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
    
                {message && (
                  <p className="text-center mt-3">{message}</p>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign Up
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
