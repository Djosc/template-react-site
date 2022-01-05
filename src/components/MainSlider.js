import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Button';
import { BiRightArrowCircle } from 'react-icons/bi';
import { BiLeftArrowCircle } from 'react-icons/bi';

const SliderSection = styled.section`
	height: 100vh;
	max-height: 1100px;
	position: relative;
	overflow: hidden;
`;

const SliderWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
`;

const Slide = styled.div`
	z-index: 1;
	width: 100%;
	height: 100%;
`;

const Slider = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&::before {
		content: '';
		position: absolute;
		z-index: 2;
		width: 100%;
		height: 100vh;
		bottom: 0vh;
		left: 0;
		overflow: hidden;
		opacity: 0.4;
		background: linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.2) 0%,
			rgba(0, 0, 0, 0.2) 50%,
			rgba(0, 0, 0, 0.2) 100%
		);
	}
`;

const SlideImage = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
`;

const SlideContent = styled.div`
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
	max-width: 1600px;
	width: calc(100% - 100px);
	color: #fff;

	h1 {
		font-size: clamp(1rem, 8vw, 2rem);
		font-weight: 400;
		text-transform: uppercase;
		text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
		text-align: left;
		margin-bottom: 0.8rem;
	}

	p {
		margin-bottom: 1.2rem;
		text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
	}
`;

const Arrow = styled(BiRightArrowCircle)`
	margin-left: 0.5rem;
`;

const SliderButtons = styled.div`
	position: absolute;
	bottom: 50px;
	right: 50px;
	display: flex;
	z-index: 10;
`;

const ArrowButtons = css`
	width: 70px;
	height: 70px;
	color: #fff;
	cursor: pointer;
	background: #000d1a;
	border-radius: 50px;
	padding: 10px;
	margin-right: 1rem;
	user-select: none;
	transition: 0.3s;

	&:hover {
		background: #cd853f;
		transform: scale(1.05);
	}
`;

const PrevArrow = styled(BiLeftArrowCircle)`
	${ArrowButtons}
`;

const NextArrow = styled(BiRightArrowCircle)`
	${ArrowButtons}
`;

const MainSlider = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;
	const timeout = useRef(null);

	useEffect(() => {
		const nextSlide = () => {
			setCurrent((current) => (current === length - 1 ? 0 : current + 1));
		};

		timeout.current = setTimeout(nextSlide, 3000);
		return function () {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
	}, [current, length]);

	const nextSlide = () => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<SliderSection>
			<SliderWrapper>
				{slides.map((slide, index) => {
					return (
						<Slide key={index}>
							{index === current && (
								<Slider>
									<SlideImage src={slide.image} alt={slide.alt} />
									<SlideContent>
										<h1>{slide.title}</h1>
										<p>{slide.description}</p>
										<Button
											to={slide.path}
											primary="true"
											css={`
												max-width: 160px;
											`}
										>
											{slide.label}
											<Arrow />
										</Button>
									</SlideContent>
								</Slider>
							)}
						</Slide>
					);
				})}
				<SliderButtons>
					<PrevArrow onClick={prevSlide} />
					<NextArrow onClick={nextSlide} />
				</SliderButtons>
			</SliderWrapper>
		</SliderSection>
	);
};

export default MainSlider;
