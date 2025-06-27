function Hero() {
    return (
        <div className="hero min-h-1/4 hero-custom-bg mt-10">
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div>
                    <h1 className="mb-5 text-5xl font-bold">Discover True Comfort at B&B Hotel – Your Perfect Stay in Moshi</h1>
                    <p className="mb-5">
                        Whether you're climbing the majestic Mount Kilimanjaro, embarking on a safari adventure, or visiting for business,
                        B&B Hotel is your ideal home away from home.
                        From solo travelers to families and professionals, we welcome all with warm smiles and unmatched hospitality.

                        Planning a climb?On safari?Attending business meetings? B&B Hotel is the perfect place to recharge.

                        Book your reservation today and experience the comfort, service, and scenery that sets B&B Hotel apart.
                    </p>
                    <button type="button" className="btn btn-primary">Book now</button>
                </div>
            </div>
        </div>
    )
}

export default Hero;