let navbar = document.getElementById("navbar-content");
let toggleBtn = document.querySelector(".navbar-toggler");
let incidentInput = document.querySelector(".multiselect");
let incidentInputFeild = document.getElementById("soort-incident-input");
let multiselectarrow = document.querySelector(".multiselect__select");
let multiselectContentWrapper = document.querySelector(
  ".multiselect__content-wrapper"
);
let multiselectsingle = document.querySelector(".multiselect__single");

toggleBtn.onclick = function () {
  toggleNavbar();
};

function toggleNavbar() {
  navbar.classList.toggle("show");
}
incidentInput.onclick = function () {
  showDropDown();
};

function showDropDown() {
  multiselectarrow.classList.toggle("tilt");
  multiselectContentWrapper.classList.toggle("d-none");
}
function highlight(e) {
  e.classList.add("multiselect__option--highlight");
}
function dehighlight(e) {
  e.classList.remove("multiselect__option--highlight");
}
function selectOption(e) {
  const elements = document.querySelectorAll(".multiselect__option");
  elements.forEach((element) => {
    element.classList.remove("multiselect__option--selected");
  });
  e.classList.add("multiselect__option--selected");
  multiselectsingle.innerHTML = e.innerHTML;
  incidentInputFeild.value = e.innerHTML;
  console.log(incidentInputFeild.value);
}
const OrderData = [
  {
    OrderId: 1656410,
    OrderType: "Corporate",
    Status: "Expired",
    IsBilling: false,
    IsRecipient: true,
    DoNotAllowRenewal: false,
    DoNotCollectPayment: false,
    Sn: 2,
    DomainOrder: true,
    Variants: [
      {
        SubscriptionType: "Paid Order - Corporate",
        OfferId: 196,
        VariantId: 1829,
        Brand: "PW",
        OfferName: "Property Week Corporates - 2020 NO VAT",
        OfferDisplayName: "",
        VariantName: "Online Domain UK - 50 Users ",
        VariantDisplayName: "Online Domain UK - 50 Users ",
        Tags: "IPU_50",
        Products: [
          {
            ProductId: 30,
            ProductName: "Property Week Online",
            ProductCode: "PWOnline",
            ProductType: "Online",
            SubscriptionStart: "23/04/2022",
            SubscriptionEnd: "22/04/2023",
            GraceEnd: null,
          },
        ],
      },
    ],
  },
  {
    OrderId: 1693027,
    OrderType: "Paid",
    Status: "Live",
    IsBilling: true,
    IsRecipient: true,
    DoNotAllowRenewal: false,
    DoNotCollectPayment: false,
    Sn: 0,
    DomainOrder: false,
    Variants: [
      {
        SubscriptionType: "Paid Order - Personal",
        OfferId: 308,
        VariantId: 2251,
        Brand: "PW",
        OfferName: "PW Digital 2023 (Standard)",
        OfferDisplayName: "",
        VariantName: "Back End Only Digital - 1 Year UK",
        VariantDisplayName: "Standard Access - 1 Year",
        Tags: "B13UK_1Y,B11UK_1Y,B13UK_1Y,B11UK_1Y",
        Products: [
          {
            ProductId: 30,
            ProductName: "Property Week Online",
            ProductCode: "PWOnline",
            ProductType: "Online",
            SubscriptionStart: "14/07/2023",
            SubscriptionEnd: "13/07/2024",
            GraceEnd: null,
          },
        ],
      },
    ],
  },
];

const filtered = OrderData.filter(({ Status }) => Status === "Live");
var endDate = filtered[0].Variants[0].Products[0].SubscriptionEnd.toString();

var format = endDate.slice(0, 5);
var month = format.slice(0, 2);

var day = format.slice(3, 5);
var endingDate = `${day}/${month}${endDate.slice(5)}`;

const date1 = new Date(endingDate);
const date2 = new Date();
//calculate time difference
var time_difference = date1 - date2;

//calculate days difference by dividing total milliseconds in a day
var days_difference = time_difference / (1000 * 60 * 60 * 24);
console.log(days_difference);

if (OrderData) {
  const filtered = OrderData.filter(({ Status }) => Status === "Live");
  if (filtered) {
    var endDate =
      filtered[0].Variants[0].Products[0].SubscriptionEnd.toString();

    var format = endDate.slice(0, 5);
    var month = format.slice(0, 2);

    var day = format.slice(3, 5);
    var endingDate = `${day}/${month}${endDate.slice(5)}`;

    const date1 = new Date(endingDate);
    const date2 = new Date();
    //calculate time difference
    var time_difference = date1 - date2;

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);
    if (days_difference < 15) {
      gsc("params", {
        isExpiring: "yes",
        isLoggedIn: "yes",
        isSubscribed: "yes",
      });
    } else {
      gsc("params", {
        isExpiring: "no",
        isLoggedIn: "yes",
        isSubscribed: "yes",
      });
    }
  } else {
    gsc("params", {
      isSubscribed: "no",
      isLoggedIn: "yes",
    });
  }
} else {
  gsc("params", {
    isSubscribed: "no",
    isLoggedIn: "yes",
  });
}






window.dataLayer.push(function () {
  const login = this.get("UserStateLoggedIn");
  if (login !== null) {

    window.dataLayer.push(function () {
      const OrderData = this.get("OrderData");
      if (OrderData !== null) {
        const filtered = OrderData.filter(({ Status }) => Status === "Live");
        if (filtered) {
          var endDate =
            filtered[0].Variants[0].Products[0].SubscriptionEnd.toString();

          var format = endDate.slice(0, 5);
          var month = format.slice(0, 2);

          var day = format.slice(3, 5);
          var endingDate = `${day}/${month}${endDate.slice(5)}`;

          const date1 = new Date(endingDate);
          const date2 = new Date();
          //calculate time difference
          var time_difference = date1 - date2;

          //calculate days difference by dividing total milliseconds in a day
          var days_difference = time_difference / (1000 * 60 * 60 * 24);
          if (days_difference > 15) {
            gsc("params", {
              isExpiring: "yes",
				   UserState: login,
            });
          }
        } else {
          gsc("params", {
            expired: "yes",
				    UserState: login,
          });
        }
      }
    });
  }
});