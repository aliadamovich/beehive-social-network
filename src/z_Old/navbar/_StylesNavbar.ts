import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LogoNavLink = styled(NavLink)`
  display: block;
  padding: 8px;
  width: 100%;
  height: 60px;
  background-color: rgb(56, 58, 69);
  margin-bottom: 20px;

  img {
    width: 100%;
  }
`;

const NavigationContainer = styled.aside`
  position: fixed;
  left: 0;
  z-index: 2000;
  background-color: rgb(248, 249, 251);
  border-right: 1px solid rgb(237, 241, 245);
  text-align: center;
  height: 100vh;
  grid-area: n;
  width: 60px;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;

  & > li {
  }

  & > li > a {
    display: block;
    width: 100%;
    padding: 15px 0;
    border-radius: 8px;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    color: #2f2e2e;

    svg {
      width: 25px;
      height: 25px;
      stroke: #2f2e2e;
      stroke-width: 1.5px;
    }

    &:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      background: linear-gradient(  to bottom right, rgb(189, 139, 237),rgb(129, 29, 222) );
			color: #fff;
      svg {
        stroke: #fff;
      }
    }
  }

  & > li > a.active {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		color: #fff;
    background: linear-gradient(
      to bottom right,
      rgb(189, 139, 237),
      rgb(129, 29, 222)
    );
    svg {
      stroke: #fff;
    }
  }
`;

export const S = {
	NavigationContainer,
	LogoNavLink,
  Navigation,
};