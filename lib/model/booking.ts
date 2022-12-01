import mongoose from 'mongoose'
import { RoomShcemaProps } from './room';

export interface BookingShcemaProps {
    productId: number;
    checkin: string;
    checkout: string;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    partial: boolean;
    price: number;
    approve: {
        orderID: string;
        payerID: string;
    },
    userEmail:string;
    product?: RoomShcemaProps;
    //만들거를 아래의 버츄얼 옆의 이름에 지정...

}

const bookingSchema = new mongoose.Schema<BookingShcemaProps>({
    productId: { type: Number, required: true, },
    checkin: String,
    checkout: String,
    numberOfAdults: Number,
    numberOfChildren: Number,
    numberOfInfants: Number,
    partial: Boolean,
    price: Number,
    approve: {
        orderID: { type: String, required: true },
        payerID: { type: String, required: true },

    },
    userEmail:String
});

bookingSchema.virtual("product",{
  localField:'productId',
  ref:"Room",
  foreignField: "roomId",
  justOne:true
})

export default (mongoose.models.Booking as mongoose.Model<BookingShcemaProps> || mongoose.model<BookingShcemaProps>("Booking", bookingSchema));



/*
import mongoose from "mongoose";
import { HostingData } from "./hosting";
export interface BookingData {
  _id: mongoose.Types.ObjectId;
  productId: string;
  checkin: Date | string;
  checkout: Date | string;
  numberOfGuests: number;
  numberOfAdults: number;
  numberOfChildren: number;
  client: string;
  payment: {
    source: string;
    orderId: string;
    paidTime: Date;
  };
  product?: HostingData;
}

const BookingSchema = new mongoose.Schema<BookingData>({
  productId: String,
  checkin: Date,
  checkout: Date,
  numberOfGuests: Number,
  numberOfAdults: Number,
  numberOfChildren: Number,
  client: String,
  payment: {
    source: String,
    orderId: String,
    paidTime: Date,
  },
});

BookingSchema.virtual("product", {
  localField: "productId",
  ref: "Hosting",
  foreignField: "_id",
});

const Booking: mongoose.Model<BookingData> =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;

*/