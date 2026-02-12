"""
Knowledge Retriever for Sahayak AI
Handles data extraction from the Social Welfare Dataset
"""

import json
from typing import Dict, List, Optional
from pathlib import Path


class KnowledgeRetriever:
    """Retrieves relevant data from the knowledge base"""

    def __init__(self, kb: Dict):
        self.kb = kb

    def get_schemes(
        self, category: Optional[str] = None, scheme_id: Optional[str] = None
    ) -> List[Dict]:
        """Get schemes filtered by category or scheme_id"""
        schemes = self.kb.get("schemes", [])
        if scheme_id:
            return [s for s in schemes if s.get("scheme_id") == scheme_id.upper()]
        if category:
            return [
                s for s in schemes if s.get("category", "").lower() == category.lower()
            ]
        return schemes

    def get_performance(self, scheme_id: Optional[str] = None) -> List[Dict]:
        """Get scheme performance data"""
        performance = self.kb.get("scheme_performance", [])
        if scheme_id:
            return [p for p in performance if p.get("scheme_id") == scheme_id.upper()]
        return performance

    def get_grievances(self, scheme_id: Optional[str] = None) -> List[Dict]:
        """Get grievances summary"""
        grievances = self.kb.get("grievances_summary", [])
        if scheme_id:
            return [g for g in grievances if g.get("scheme_id") == scheme_id.upper()]
        return grievances

    def get_coverage(self, ward_id: Optional[str] = None) -> List[Dict]:
        """Get beneficiary coverage data"""
        coverage = self.kb.get("beneficiary_coverage", [])
        if ward_id:
            return [c for c in coverage if c.get("ward_id") == ward_id.upper()]
        return coverage

    def get_vulnerability(self, ward_id: Optional[str] = None) -> List[Dict]:
        """Get vulnerability scores"""
        vulnerability = self.kb.get("vulnerability_scores", [])
        if ward_id:
            return [v for v in vulnerability if v.get("ward_id") == ward_id.upper()]
        return vulnerability

    def get_wards(self, ward_id: Optional[str] = None) -> List[Dict]:
        """Get ward information"""
        wards = self.kb.get("wards", [])
        if ward_id:
            return [w for w in wards if w.get("ward_id") == ward_id.upper()]
        return wards

    def get_stats(self) -> Dict:
        """Get summary statistics"""
        return {
            "total_schemes": len(self.kb.get("schemes", [])),
            "total_wards": len(self.kb.get("wards", [])),
            "total_citizens": len(self.kb.get("citizens", [])),
        }

    def get_meta(self) -> Dict:
        """Get metadata about the dataset"""
        return self.kb.get("meta", {})
