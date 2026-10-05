import{ useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./signup-view.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import type { User } from "../../types/user";

type LoginResponse = {
  user: Omit<User, "token">;
  token: string;
};


export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setMessage("Creating your account...");

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    try {
      const response = await fetch(
        "https://movie-api-o14j.onrender.com/users",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        const errorMessage =
          errorData.errors?.[0]?.msg || "Signup failed. Please try again.";

        throw new Error(errorMessage);
      }
      setMessage("Account created. Signing you in...");

      const loginResponse = await fetch(
        "https://movie-api-o14j.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
          }),
        }
      );

      if (!loginResponse.ok) {
        throw new Error("Account created, but automatic login failed.");
      }

      const loginData: LoginResponse = await loginResponse.json();

      if (!loginData.user) {
        throw new Error("Account created, but automatic login failed.");
      }

      const userData = {
        ...loginData.user,
        token: loginData.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(userData));
      dispatch(setUser(userData));


    } catch (error) {
      console.error("Signup error:", error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="auth-page">
      <Row className="justify-content-center w-100">
        <Col xs={12} md="auto">
          <Card className="auth-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Sign Up</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={7}
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

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
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
                  {isLoading ? "Please wait..." : "Sign Up"}
                </Button>
                
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Log In
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};