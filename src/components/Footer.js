import React from 'react';


function Footer() {
    return (

        <div className="bg-dark text-center text-white">
            <div class="container p-4">
                <section className='mb-4'>
                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className='fab fa-facebook-f'></i>
                    </a>
                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className='fab fa-twitter'></i>
                    </a>
                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className='fab fa-google'></i>
                    </a>
                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className='fab fa-instagram'></i>
                    </a>
                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className='fab fa-linkedin-in'></i>
                    </a>
                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                        <i className='fab fa-github'></i>
                    </a>

                </section>
                <section class="">
                    <form action="">

                        <div class="row d-flex justify-content-center">

                            <div class="col-auto">
                                <p class="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>

                            <div class="col-md-5 col-12">

                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="form5Example21" class="form-control" />
                                    <label class="form-label" for="form5Example21">Email address</label>
                                </div>
                            </div>

                            <div class="col-auto">

                                <button type="submit" class="btn btn-outline-light mb-4">
                                    Subscribe
                                </button>
                            </div>

                        </div>

                    </form>
                </section>
                <section class="mb-4">
                    <p>
                        We accept Credit Card, Debit Card
                        and Cryptocurrency payments.
                    </p>
                </section>
                <section class="">

                    <div class="row">

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">TTHOTEL.COM</h5>

                            <ul class="list-unstyled mb-0">
                                <li>
                                    <a href="#!" class="text-white">About Us</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Smart Program</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Travel Credits</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">TT Members</a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">SUPPORT</h5>

                            <ul class="list-unstyled mb-0">
                                <li>
                                    <a href="#!" class="text-white">Contact us</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Media Contact</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Terms & Conditions</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">My Room</a>
                                </li>
                            </ul>
                        </div>



                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">USEFUL LINKS</h5>

                            <ul class="list-unstyled mb-0">
                                <li>
                                    <a href="#!" class="text-white">Mobile App</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Business Travel</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Payment Options</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Binance Travel</a>
                                </li>
                            </ul>
                        </div>



                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">RESOURCES</h5>

                            <ul class="list-unstyled mb-0">
                                <li>
                                    <a href="#!" class="text-white">Official Blog</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Travel Advices</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Travel Guides</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-white">Read Reviews</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: '#19192f' }}>
                © 2022 Copyright:
                <a className="text-white" href="#">T&THotel</a>
            </div>
        </div>

    )
}

export default Footer;