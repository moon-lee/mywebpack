import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons/faTachometerAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faWeight } from "@fortawesome/free-solid-svg-icons/faWeight";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons/faMoneyCheckAlt";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons/faGooglePlusSquare";

// library.add(faCloud, faTable, faBars, faTachometerAlt, faSignOutAlt, faGooglePlusSquare, faWeight, faMoneyCheckAlt);

// dom.i2svg();

export function init_fonts() {
    console.log("fonts Ready");

    library.add(faCloud, faTable, faBars, faTachometerAlt, faSignOutAlt, faGooglePlusSquare, faWeight, faMoneyCheckAlt);

    dom.i2svg();
}

// $(document).ready(function () {
//     console.log("fonts Ready");

//     library.add(faCloud, faTable, faBars, faTachometerAlt, faSignOutAlt, faGooglePlusSquare, faWeight, faMoneyCheckAlt);

//     dom.i2svg();
// });