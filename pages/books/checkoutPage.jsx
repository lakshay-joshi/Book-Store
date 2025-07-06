import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/orders/ordersApi";

const CheckoutPage = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.newPrice || 0), 0)
    .toFixed(2);
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: data.email,
      address: {
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Confirmed Order",
        text: "Your order placed successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error placing your order", error);
      alert(error?.data?.message || "Failed to place your order");
    }
  };

  if (isLoading) return <div>Loading....</div>;
  if (cartItems.length === 0) return <div>Your cart is empty.</div>;

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold text-xl text-gray-600 mb-2">
            Cash On Delivery
          </h2>
          <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
          <p className="text-gray-500 mb-6">
            Items: {cartItems.length}
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="name">Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      id="name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Hidden input for email submission */}
                  <input type="hidden" {...register("email")} value={currentUser?.email || ""} />

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      id="email"
                      disabled
                      defaultValue={currentUser?.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      type="text"
                      id="phone"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="+123 456 7890"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      {...register("address", { required: "Address is required" })}
                      type="text"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / Region</label>
                    <input
                      {...register("country", { required: "Country is required" })}
                      type="text"
                      id="country"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State / Province</label>
                    <input
                      {...register("state", { required: "State is required" })}
                      type="text"
                      id="state"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      {...register("zipcode", { required: "Zipcode is required" })}
                      type="text"
                      id="zipcode"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode.message}</p>}
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        id="billing_same"
                        className="form-checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        I agree to the{" "}
                        <a href="#" onClick={(e) => e.preventDefault()} className="underline text-blue-600">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" onClick={(e) => e.preventDefault()} className="underline text-blue-600">
                          Shopping Policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <button
                      type="submit"
                      disabled={!isChecked}
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${
                        !isChecked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Place an Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;