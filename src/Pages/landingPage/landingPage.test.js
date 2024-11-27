import { KeyBenefitsSection } from './LandingPage';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { MemoryRouter } from 'react-router';

test("renders landingPage navbar correctly", () => {
    render(
        <MemoryRouter>
            <LandingPage />
        </MemoryRouter>
    );
    expect(screen.getByAltText("logoImage")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
});

test("renders hero section with correct text and image", () => {
    render(
        <MemoryRouter>
            <LandingPage />
        </MemoryRouter>
    ); expect(screen.getByText(/Explore a World of Stories, Knowledge, and Imagination/i)).toBeInTheDocument();
    expect(screen.getByAltText("heroSectionImage")).toBeInTheDocument();
});


test("renders Features section with correct text and image", () => {
    render(
        <MemoryRouter>
            <LandingPage />
        </MemoryRouter>
    ); expect(screen.getByText(/Discover Our Curated Bookstore/i)).toBeInTheDocument();
    expect(screen.getByAltText("featuresSectionImg")).toBeInTheDocument();
});

test('renders KeyBenefitsSection with all headings and text', () => {
    render(<KeyBenefitsSection />);

    expect(screen.getByRole("heading", { name: "Recommendations" })).toBeInTheDocument();
    expect(screen.getByText(/Digital Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Device Access/i)).toBeInTheDocument();

    expect(screen.getByText(/Access thousands of eBooks/i)).toBeInTheDocument();
    expect(screen.getByText(/Enjoy personalized book recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Read or listen to your books anytime/i)).toBeInTheDocument();
});

test('renders buttons in KeyBenefitsSection', () => {
    render(<KeyBenefitsSection />);

    expect(screen.getByText(/Browse Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Reading/i)).toBeInTheDocument();
});

test('renders images in KeyBenefitsSection', () => {
    render(<KeyBenefitsSection />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3); // There are 3 images in total

    images.forEach(image => {
        expect(image).toHaveStyle('width: 130px');
    });
});